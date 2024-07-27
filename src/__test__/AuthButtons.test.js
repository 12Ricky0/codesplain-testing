import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import AuthButtons from "../components/auth/AuthButtons";
import { createServer } from "./server";
import { SWRConfig } from "swr";

describe("testing AuthButtons when user is not signed in", () => {
    createServer([
        {
            path: "/api/user",
            res: (req, res, ctx) => {
                return {
                    user: null
                }
            }
        },
    ])

    it("displays both signIn and signOut buttons", async () => {
        render(
            <MemoryRouter >
                <AuthButtons />
            </MemoryRouter>
        );
        const signInButton = await screen.findByRole('link', { name: /sign in/i });
        const signUpButton = await screen.findByRole('link', { name: /sign up/i });
        const signOutButton = screen.queryByRole('link', { name: /sign out/i });
        expect(signInButton).toBeInTheDocument();
        expect(signUpButton).toBeInTheDocument();
        expect(signOutButton).not.toBeInTheDocument()
    })
})

describe("testing AuthButtons when user is signed in", () => {
    createServer([
        {
            path: "/api/user",
            res: () => {
                return {
                    user: {
                        id: 1,
                        username: 'testuser'
                    }
                }
            }
        },
    ])

    it("does not display both signIn and signOut buttons", async () => {
        render(
            <SWRConfig value={{ provider: () => new Map() }}>
                <MemoryRouter >
                    <AuthButtons />
                </MemoryRouter>
            </SWRConfig>
        );
        // await pause()
        // screen.debug()
        const signOutButton = await screen.findByRole('link', { name: /sign out/i });

        const signInButton = screen.queryByRole('link', { name: /sign in/i });
        const signUpButton = screen.queryByRole('link', { name: /sign up/i });
        expect(signInButton).not.toBeInTheDocument();
        expect(signUpButton).not.toBeInTheDocument();
        expect(signOutButton).toBeInTheDocument()
    })
})

// const pause = () => {
//     return new Promise((resolve) => setTimeout(resolve, 100));
// }