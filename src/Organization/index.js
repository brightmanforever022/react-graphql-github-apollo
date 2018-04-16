import React from 'react';
import { Query } from 'react-apollo';

import { GET_REPOSITORIES_OF_ORGANIZATION } from './queries';
import RepositoryList from '../Repository';

import Loading from '../Loading';
import ErrorMessage from '../Error';

const Organization = ({ organizationName }) => (
  <Query
    query={GET_REPOSITORIES_OF_ORGANIZATION}
    variables={{
      organizationName,
    }}
    skip={organizationName === ''}
    notifyOnNetworkStatusChange={true}
  >
    {({ data, loading, error, fetchMore }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }

      const { organization } = data;

      if (loading && !organization) {
        return <Loading isCenter={true} />;
      }

      return (
        <RepositoryList
          loading={loading}
          repositories={organization.repositories}
          fetchMore={fetchMore}
          entry={'organization'}
        />
      );
    }}
  </Query>
);

export default Organization;
