import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import AuthButtons from "../components/auth/AuthButtons";
import { createServer } from "./server";

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
            res: (req, res, ctx) => {
                return {
                    items: [
                        { id: 1, email: 'foo@bar.com' },
                    ]
                }
            }
        },
    ])

    it("does not display both signIn and signOut buttons", async () => {
        render(
            <MemoryRouter >
                <AuthButtons />
            </MemoryRouter>
        );
        const signInButton = screen.queryByRole('link', { name: /sign in/i });
        const signUpButton = screen.queryByRole('link', { name: /sign up/i });
        // const signOutButton = screen.queryByRole('link', { name: /sign out/i });
        expect(signInButton).not.toBeInTheDocument();
        expect(signUpButton).not.toBeInTheDocument();
        // expect(signOutButton).not.toBeInTheDocument()
    })
})

