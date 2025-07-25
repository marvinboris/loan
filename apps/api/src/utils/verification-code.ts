import { config } from '../config';

export function generateVerificationCode(minutes = 15) {
  const verificationCode = config.modeTest
    ? '000000'
    : Math.floor(100000 + Math.random() * 900000).toString();
  const codeExpiresAt = new Date(Date.now() + minutes * 60 * 1000); // 15 minutes by default

  return { verificationCode, codeExpiresAt };
}
