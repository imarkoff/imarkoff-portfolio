import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import FormField from "../index";

describe("FormField", () => {
    it("renders a default input with a label", () => {
        render(<FormField id="test-input" label="Test Label" />);

        const input = screen.getByLabelText("Test Label");

        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("id", "test-input");
        expect(input).not.toBeDisabled();
    });

    it("renders with a label and an icon", () => {
        render(<FormField id="test-input" label="Test Label" labelIcon={<span>Icon</span>} />);

        expect(screen.getByText("Test Label")).toBeInTheDocument();
        expect(screen.getByText("Icon")).toBeInTheDocument();
    });

    it("displays a message when provided", () => {
        render(<FormField id="test-input" label="Test Label" message="This is a hint." />);
        expect(screen.getByText("This is a hint.")).toBeInTheDocument();
    });

    it("displays character count when maxLength is provided", () => {
        render(<FormField id="test-input" label="Test Label" maxLength={100} />);

        expect(screen.getByText("0 / 100")).toBeInTheDocument();
    });

    it("updates character count on input change", async () => {
        const user = userEvent.setup();

        render(<FormField id="test-input" label="Test Label" maxLength={100} />);
        const input = screen.getByLabelText("Test Label");
        await user.type(input, "hello");

        expect(screen.getByText("5 / 100")).toBeInTheDocument();
    });

    it("initializes character count with defaultValue", () => {
        render(<FormField id="test-input" label="Test Label" maxLength={100} defaultValue="initial" />);

        expect(screen.getByLabelText("Test Label")).toHaveValue("initial");
        expect(screen.getByText("7 / 100")).toBeInTheDocument();
    });

    it("calls onChange handler when value changes", async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(<FormField id="test-input" label="Test Label" onChange={handleChange} />);
        const input = screen.getByLabelText("Test Label");
        await user.type(input, "test");

        expect(handleChange).toHaveBeenCalledTimes(4);
    });

    it("renders a disabled input", () => {
        render(<FormField id="test-input" label="Test Label" disabled />);
        const input = screen.getByLabelText("Test Label");

        expect(input).toBeDisabled();
    });

    it("renders with an error state and message", () => {
        render(<FormField id="test-input" label="Test Label" state="error" message="Invalid input" />);

        expect(screen.getByText("Invalid input")).toBeInTheDocument();
        const container = screen.getByLabelText("Test Label")
            .closest('[data-state="error"]');
        expect(container).toBeInTheDocument();
    });

    it("renders with a success state", () => {
        render(<FormField id="test-input" label="Test Label" state="success" />);

        const container = screen.getByLabelText("Test Label").closest('[data-state="success"]');
        expect(container).toBeInTheDocument();
    });

    it("renders as a textarea when 'as' prop is set to 'textarea'", () => {
        render(<FormField id="test-textarea" label="Test Textarea" as="textarea" />);
        const textarea = screen.getByLabelText("Test Textarea");

        expect(textarea).toBeInTheDocument();
        expect(textarea.tagName).toBe("TEXTAREA");
    });

    it("applies additional class names to the root element", () => {
        render(<FormField id="test-input" label="Test Label" className="custom-class" />);
        const container = screen.getByRole("textbox");

        expect(container).toHaveClass("custom-class");
    });

    it("applies aria-describedby when message is provided", () => {
        render(<FormField id="test-input" label="Test Label" message="This is a hint." />);
        const input = screen.getByLabelText("Test Label");
        const message = screen.getByText("This is a hint.");

        expect(input).toHaveAttribute("aria-describedby", message.id);
        expect(message).toHaveAttribute("id", input.getAttribute("aria-describedby")!);
    });

    it("forwards additional props to the input element", () => {
        render(<FormField id="test-input" label="Test Label" data-testid="my-input" placeholder="Enter text" />);

        const input = screen.getByTestId("my-input");

        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("placeholder", "Enter text");
    });
});