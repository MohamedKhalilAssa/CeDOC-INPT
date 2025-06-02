import { jwtDecode, JwtPayload } from "jwt-decode";
import { useMemo } from "react";

type DecodedToken<T = {}> = JwtPayload & T;

interface UseDecodedTokenResult<T> {
  valid: boolean;
  expired: boolean;
  error?: string;
  claims: DecodedToken<T> | null;
  getClaim: <K extends keyof DecodedToken<T>>(
    key: K
  ) => DecodedToken<T>[K] | null;
  issuedAt?: Date;
  expiresAt?: Date;
  isAboutToExpire: (thresholdSeconds?: number) => boolean;
}

export function UseJWT<T = {}>(
  token: string | null | undefined
): UseDecodedTokenResult<T> {
  return useMemo(() => {
    if (!token) {
      return emptyResult<T>("No token provided");
    }

    try {
      const decoded = jwtDecode<DecodedToken<T>>(token);
      const now = Math.floor(Date.now() / 1000);

      const exp = decoded.exp ?? 0;
      const iat = decoded.iat ?? 0;

      const expired = exp < now;

      return {
        valid: !expired,
        expired,
        claims: decoded,
        getClaim: <K extends keyof DecodedToken<T>>(key: K) =>
          decoded[key] ?? null,
        issuedAt: iat ? new Date(iat * 1000) : undefined,
        expiresAt: exp ? new Date(exp * 1000) : undefined,
        isAboutToExpire: (thresholdSeconds = 300) =>
          exp !== 0 && exp - now <= thresholdSeconds,
      };
    } catch (err) {
      return emptyResult<T>("Invalid token or failed to decode");
    }
  }, [token]);
}

function emptyResult<T>(error: string): UseDecodedTokenResult<T> {
  return {
    valid: false,
    expired: true,
    error,
    claims: null,
    getClaim: () => null,
    issuedAt: undefined,
    expiresAt: undefined,
    isAboutToExpire: () => true,
  };
}
