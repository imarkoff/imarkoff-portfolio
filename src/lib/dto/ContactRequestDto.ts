import * as z from 'zod';

const ContactRequestDto = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Invalid email address'),
    message: z.string().min(1, 'Message is required').max(500, 'Message cannot exceed 500 characters'),
});

type ContactRequestDto = z.infer<typeof ContactRequestDto>;

export default ContactRequestDto;