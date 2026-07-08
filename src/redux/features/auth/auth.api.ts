import baseApi from "@/redux/api/api";
import { SignInResponse } from "./auth.type";
import { SignInInput } from "@/validation/auth.validation";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation<SignInResponse, SignInInput>({
            query: (data) => {
                return {
                    url: "/admin/login",
                    method: "POST",
                    body: data
                }
            }
        })
    })
})

export const {
    useSignInMutation
} = authApi;