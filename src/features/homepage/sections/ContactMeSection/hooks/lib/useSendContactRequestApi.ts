"use client";

import useSWRMutation from "swr/mutation";
import ContactRequestDto from "@/lib/dto/ContactRequestDto";
import apiConfig from "@/config/apiConfig";
import sendContactRequestApi from "@/lib/api/contact/sendContactRequestApi";

export default function useSendContactRequestApi() {
    const {
        trigger,
        isMutating: isSendingContactRequest,
        error: contactRequestError,
        data: contactRequestResponse,
    } = useSWRMutation(
        apiConfig.endpoints.contactMe.route,
        sendContactRequestApi,
    );

    const send = async (data: ContactRequestDto) => {
        if (isSendingContactRequest || contactRequestResponse) return;
        await trigger(data);
    }

    return {
        sendContactRequest: send,
        isSendingContactRequest,
        contactRequestError,
        isContactRequestResponse: !!contactRequestResponse,
    };
}