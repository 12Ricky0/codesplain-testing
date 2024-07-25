import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import HomeRoute from "../routes/HomeRoute";
import { rest } from "msw";
import { setupServer } from "msw/node";

const hanler = [
    rest.get("/api/repositories", (req, res, ctx) => {
        const language = (req.url.searchParams.get('q')).split(':')[2]
        return res(
            ctx.json({
                items: [
                    { id: 1, full_name: language + '_one' },
                    { id: 2, full_name: language + '_two' },
                ]
            })
        );
    }),
];

const server = setupServer(...hanler);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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