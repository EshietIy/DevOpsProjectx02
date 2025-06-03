import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';


export const authOptions = {
providers:[
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || ' ',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || ' ',
    }),
    GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID || ' ',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || ' ',
    })
],
secret: process.env.SECRET ,
}

export default NextAuth(authOptions);
// This code sets up NextAuth.js with Google and GitHub as authentication providers.
// It exports the authentication options, including the providers and a secret key for session encryption.
// The Google and GitHub providers are configured with client IDs and secrets, which are expected to be set in environment variables.  