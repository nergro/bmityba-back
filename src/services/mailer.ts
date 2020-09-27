import nodemailer from 'nodemailer';

import { getEnvironmentVariableString } from './environmentVariable';

const service: string = 'gmail';
const mail_user: string = getEnvironmentVariableString('MAIL_USER');
const mail_password: string = getEnvironmentVariableString('MAIL_PASSWORD');
const mail_host: string = getEnvironmentVariableString('MAIL_HOST');
const mail_port: string = getEnvironmentVariableString('MAIL_PORT');
const mail_from_name: string = getEnvironmentVariableString('MAIL_FROM_NAME');
const mail_reply_to: string = getEnvironmentVariableString('MAIL_REPLY_TO');
const mail_reply_to_name: string = getEnvironmentVariableString(
    'MAIL_REPLY_TO_NAME'
);

const transporter: nodemailer.Transporter = nodemailer.createTransport({
    service,
    auth: {
        pass: mail_password,
        user: mail_user
    },
    pool: true
});

interface MailOptions {
    from: string | undefined;
    html: string;
    subject: string;
    to: string;
    replyTo: string;
}

const getMailOptions = (
    template: string,
    subject: string,
    recipient: string
): MailOptions => {
    return {
        from: `${mail_from_name} <${mail_user}>`,
        html: template,
        subject,
        to: recipient,
        replyTo: `${mail_reply_to_name} <${mail_reply_to}>`
    };
};

export const sendRequestEmail = async (
    name: string,
    mail: string,
    message: string,
    subject?: string
): Promise<void> => {
    const mailOptions: MailOptions = getMailOptions(
        `<h1>Gauta užklausa!</h1>
        <p><strong>Vardas:</strong> ${name}<p>
        <p><strong>Kliento el. paštas:</strong> ${mail}<p>
        ${subject ? `<p><strong>Tema: </strong> ${subject}</p>` : ''}
        <p><strong>Žinutė: </strong> ${message}</p>
        `,
        'Užklausa',
        'brigitameiglaite@gmail.com'
    );

    await transporter.sendMail(mailOptions);
};
