import { register } from 'module';
import {apiSlice} from '../api/apiSlice';
import {userLoggedOut, userLogin, userRegistration} from './authSlice';
import { BiSolidRightTopArrowCircle } from 'react-icons/bi';
import { act } from 'react';

type RegistrationRespose = {
    message: string;
    activationToken: string;
};

type RegistrationData = {}

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // User Registration
        register: builder.mutation<RegistrationRespose, RegistrationData>({
            query: (data) => ({
                url: "registration",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    
                    dispatch(
                        userRegistration({
                            token: result.data.activationToken
                        })
                    );
                } catch (error:any){
                    console.log(error);
                }
            }
        }),
        activation: builder.mutation({
        query:({activation_token, activation_code}) => ({
            url: "activate-user",
            method: "POST",
            credentials: "include" as const,
            body: {
                activation_token,
                activation_code
            },
        }),
    }),
    login: builder.mutation({
            query: ({email, password}) => ({
                url: "login",
                method: "POST",
                body:{
                    email,
                    password
                },
                credentials: "include" as const,
            }),
          async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    
                    dispatch(
                        userLogin({
                            accessToken: result.data.accessToken,
                            user: result.data.user
                        })
                    );
                } catch (error:any){
                    console.log(error);
                }
            }  
    }),
    socialAuth: builder.mutation({
            query: ({email, name, avatar}) => ({
                url: "social-auth",
                method: "POST",
                body:{
                    email,
                    name,
                    avatar
                },
                credentials: "include" as const,
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
                } catch (error:any){
                    console.log(error);
                }
            }  
    }),
    logOut: builder.query({
            query: () => ({
                url: "logout",
                method: "GET",
                credentials: "include" as const,
            }),
          async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {                    
                    dispatch(
                        userLoggedOut()
                    );
                } catch (error:any){
                    console.log(error);
                }
            }  
    })
    }),
    
    
});

export const { useRegisterMutation, useActivationMutation, useLoginMutation, useSocialAuthMutation, useLogOutQuery } = authApi;