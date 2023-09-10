import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '',
  credentials: 'include',
});

export const api = createApi({
  baseQuery,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes: [],
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   */
  endpoints: () => ({}),
});
