import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import HomeRoute from "../routes/HomeRoute";
import { createServer } from "./server";

createServer([
    {
        path: "/api/repositories",
        res: (req) => {
            const language = (req.url.searchParams.get('q')).split(':')[2]

            return {
                items: [
                    { id: 1, full_name: language + '_one' },
                    { id: 2, full_name: language + '_two' },
                ]
            }
        }
    },
])


describe("testing data fetching", () => {
    test("renders search results", async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <HomeRoute />
            </MemoryRouter>
        );
        const languages = ['javascript', 'typescript', 'rust', 'python', 'go', 'java']

        for (let language of languages) {
            const link = await screen.findAllByRole('link', {
                name: new RegExp(`${language}_`)
            })
            expect(link).toHaveLength(2); // 2 repositories for each language
        }



    });
})

// const pause = new Promise((resolve) => {
//     setTimeout(resolve, 100);
// });