import { useQuery, gql } from '@apollo/client';

const ME_QUERY = gql`
  query me {
    me {
      id
      email
      name
    }
  }
`;

function ProtectedContent() {
  const { data, loading, error } = useQuery(ME_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data.me) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      Welcome, {data.me.email}!
      {/* Display protected content here */}
    </div>
  );
}

export default ProtectedContent
