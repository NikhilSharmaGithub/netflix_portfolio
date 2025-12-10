import { GraphQLClient } from 'graphql-request';
import { getDatoCmsToken } from './getDatoCmsToken';

const DATO_CMS_ENDPOINT = 'https://graphql.datocms.com/';

class LazyDatoCMSClient {
  private client: GraphQLClient | null = null;

  private getClient(): GraphQLClient {
    if (!this.client) {
      const DATO_CMS_API_TOKEN = getDatoCmsToken();
      this.client = new GraphQLClient(DATO_CMS_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${DATO_CMS_API_TOKEN}`,
        },
      });
    }
    return this.client;
  }

  async request<T>(query: string): Promise<T> {
    return this.getClient().request<T>(query);
  }
}

const datoCMSClient = new LazyDatoCMSClient();

export default datoCMSClient;
