import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLogin } from '../auth/authSlice';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_SERVER_URI,
    }),
    endpoints: (builder) => ({
        refreshToken: builder.query({
            query: (data) => ({
                url: 'refreshtoken',
                method: 'GET',
                credentials: 'include' as const,
            }),
        }),
        loadUser: builder.query({
            query: () => ({
                url: 'me',
                method: 'GET',
                credentials: 'include' as const,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    

                    dispatch(
                        userLogin({
                            accessToken: result.data.activationToken,
                            user: result.data.user
                        })
                    );
                } catch (error: any) {
                    console.log(error);
                }
            }
        })
    })

});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;