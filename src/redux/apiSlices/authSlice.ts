
import { getFromLocalStorage } from "../../utils/local-stroage";
import { api } from "../api/baseApi";
const resetToken = getFromLocalStorage("resetToken")
const authSlice = api.injectEndpoints({
    endpoints: (builder) => ({ 

        otpVerify: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/auth/verify-email",
                    body: data,
                }
            }
        }), 

        login: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/auth/login",
                    body: data
                }
            },
        }), 

        forgetPassword: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/auth/forget-password",
                    body: data
                }
            }
        }), 

        resetPassword: builder.mutation({
            query: (value) => ({
                url: "/auth/reset-password",
                headers: { authorization: resetToken ?? undefined },
                method: "POST",
                body: value
            })
        }),

        changePassword: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/auth/change-password",
                    body: data,
                }
            }
        }),

        updateProfile: builder.mutation({
            query: (data) => {
                return {
                    method: "PATCH",
                    url: "/user/profile",
                    body: data,
                }
            }
        }),

        profile: builder.query({
            query: () => {
                return {
                    url: "/user/profile",
                }
            },
        }),
    })
});

export const {
    useOtpVerifyMutation,
    useLoginMutation,
    useForgetPasswordMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
    useUpdateProfileMutation,
    useProfileQuery,
} = authSlice;