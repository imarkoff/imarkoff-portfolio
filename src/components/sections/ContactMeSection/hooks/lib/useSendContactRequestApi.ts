"use client";

import useSWRMutation from "swr/mutation";
import ContactRequestDto from "@/lib/dto/ContactRequestDto";
import apiConfig from "@/config/apiConfig";
import { sendContactRequest } from "@/lib/api/contact";

export default function useSendContactRequestApi() {
    const {
        trigger,
        isMutating: isSendingContactRequest,
        error: contactRequestError,
        data: contactRequestResponse,
    } = useSWRMutation(
        apiConfig.endpoints.contactMe.route,
        sendContactRequest,
    );

    const send = async (data: ContactRequestDto) => {
        if (isSendingContactRequest || contactRequestResponse) return;
        await trigger(data);
    }

    return {
        sendContactRequest: send,
        isSendingContactRequest,
        contactRequestError,
        contactRequestResponse,
    };
}