import ContactRequestDto from '@/lib/dto/ContactRequestDto';
import ContactRequest from '@/lib/models/ContactRequest';
import apiConfig from "@/config/apiConfig";

export async function sendContactRequest(
    url: string = apiConfig.endpoints.contactMe.route,
    { arg }: { arg: ContactRequestDto },
): Promise<ContactRequest> {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(arg),
    });

    if (!response.ok) {
        throw new Error(`Error sending contact request: ${response.statusText}`);
    }

    return response.json();
}