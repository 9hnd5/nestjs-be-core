export interface MailOption {
    isGlobal?: boolean;
    service?: 'gmail';
    host: string;
    port: number;
    secure?: boolean;
    auth: {
        user: string;
        pass: string;
    };
}
export interface MessageOption {
    from?: string;
    to: string;
    cc?: string[];
    bcc?: string[];
    subject?: string;
    text?: string;
    html?: string;
    attachments?: any;
}
