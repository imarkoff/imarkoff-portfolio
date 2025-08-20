import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ContactRequestDto from "@/lib/dto/ContactRequestDto";

export default function useContactRequestForm(
    onSubmit: (data: ContactRequestDto) => Promise<void>,
    isSubmitting: boolean,
    isSuccess: boolean
) {
    const methods = useForm<ContactRequestDto>({
        resolver: zodResolver(ContactRequestDto),
    });

    const handleSubmit = methods.handleSubmit(async (data) => {
        if (isSubmitting || isSuccess) return;
        await onSubmit(data);
    });

    return {
        ...methods,
        handleSubmit
    };
}