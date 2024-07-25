import { render, screen } from "@testing-library/react";
import RepositoriesSummary from "../components/repositories/RepositoriesSummary";

describe("RepositoriesSummary", () => {
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
})