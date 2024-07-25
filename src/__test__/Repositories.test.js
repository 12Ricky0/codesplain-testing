import { render, screen } from "@testing-library/react";
import RepositoriesSummary from "../components/repositories/RepositoriesSummary";
import RepositoriesListItem from "../components/repositories/RepositoriesListItem";
import { MemoryRouter } from "react-router";

// You can mock a component by passing: This can be done the sole the 'act' problem
// jest.mock('../components/tree/FileIcon', () => {
//     return () => {
//         "FileIcon"
//     }
// })

function renderListComponent() {
    const mockRepository = {
        full_name: "test/repo",
        name: "repo",
        description: "A test repository",
        language: "JavaScript",
        html_url: "https://github.com/test/repo",
        owner: { login: 'facebook' }
    }
    render(
        <MemoryRouter>
            <RepositoriesListItem repository={mockRepository} />
        </MemoryRouter>
    );
    return { mockRepository }
}
describe("Repositories Testing", () => {
    it("displays information about the repository", () => {
        const repo = {
            language: "JavaScript",
            stargazers_count: 1,
            open_issues: 30,
            forks: 5
        }
        render(<RepositoriesSummary repository={repo} />);
        for (let key in repo) {
            expect(screen.getByText(new RegExp(repo[key]))).toBeInTheDocument();
        }
    })

    it("shows a link to the repository", async () => {
        const { mockRepository } = renderListComponent();

        //use find.. to solve asynchronous functionality
        const img = await screen.findByRole('img', {
            name: /JavaScript/i
        })
        expect(img).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /github repository/i })).toHaveAttribute('href', mockRepository.html_url);
    })

    it("shows the appropriate language icon", async () => {
        renderListComponent()
        const icon = await screen.findByRole('img', {
            name: /JavaScript/i
        })

        expect(icon).toHaveClass('js-icon')
    })

    it("shows the link to the code editor page", async () => {
        const { mockRepository } = renderListComponent()
        const link = await screen.findByRole('link', {
            name: new RegExp(mockRepository.owner.login)
        })

        expect(link).toHaveAttribute('href', `/repositories/${mockRepository.full_name}`)
    })

})
