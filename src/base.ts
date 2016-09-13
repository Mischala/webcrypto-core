namespace webcrypto {

    export type CryptoBuffer = ArrayBuffer | ArrayBufferView;

    export interface JWK {
        [key: string]: any;
    }

    export function PrepareAlgorithm(alg: AlgorithmIdentifier): Algorithm {
        let res: Algorithm;
        if (typeof alg === "string")
            res = { name: alg };
        else
            res = alg;
        BaseCrypto.checkAlgorithm(res);
        return res;
    }

    export function PrepareData(data: CryptoBuffer, paramName: string): Uint8Array {
        if (!data)
            throw new WebCryptoError(`Parameter '${paramName}' is required and cant be empty`);
        if (ArrayBuffer.isView(data) || data instanceof ArrayBuffer)
            return new Uint8Array(data as any);
        throw new WebCryptoError(`Incoming parameter '${paramName}' has wrong data type. Must be ArrayBufferView or ArrayBuffer`);
    }

    export class BaseCrypto {

        static checkAlgorithm(alg: Algorithm) {
            if (typeof alg !== "object")
                throw new TypeError("Wrong algorithm data type. Must be Object");
            if (!("name" in alg))
                throw new AlgorithmError(AlgorithmError.PARAM_REQUIRED, "name");
            if (typeof alg.name !== "string")
                throw new AlgorithmError(AlgorithmError.PARAM_WRONG_VALUE, "name", "String");
        }

        static checkAlgorithmParams(alg: Algorithm) {
            this.checkAlgorithm(alg);
        }

        static checkKey(key: CryptoKey, alg?: string, type: string = null, usage: string = null) {
            // check key empty
            if (!key)
                throw new CryptoKeyError(CryptoKeyError.EMPTY_KEY);
            // check alg
            let keyAlg = key.algorithm;
            if (alg && (!keyAlg || keyAlg.name.toUpperCase() !== alg.toUpperCase()))
                throw new CryptoKeyError(CryptoKeyError.WRONG_KEY_ALG, keyAlg.name, alg);
            // check type
            if (type && (!key.type || key.type.toUpperCase() !== type.toUpperCase()))
                throw new CryptoKeyError(CryptoKeyError.WRONG_KEY_TYPE, key.type, type);
            // check usage
            if (usage) {
                for (let keyUsage of key.usages) {
                    if (usage.toUpperCase() === keyUsage.toUpperCase())
                        return;
                }
                throw new CryptoKeyError(CryptoKeyError.WRONG_KEY_USAGE, usage);
            }
        }

        static checkWrappedKey(key: CryptoKey) {
            if (!key.extractable)
                throw new CryptoKeyError(CryptoKeyError.NOT_EXTRACTABLE);
        }

        static checkKeyUsages(keyUsages: string[]) {
            if (!keyUsages || !keyUsages.length)
                throw new WebCryptoError("Parameter 'keyUsages' cannot be empty.");
        }

        static checkFormat(format: string, type?: string) {
            switch (format.toLowerCase()) {
                case "raw":
                    if (type && type.toLowerCase() !== "secret")
                        throw new CryptoKeyError(CryptoKeyError.WRONG_FORMAT, type, "raw");
                    break;
                case "pkcs8":
                    if (type && type.toLowerCase() !== "private")
                        throw new CryptoKeyError(CryptoKeyError.WRONG_FORMAT, type, "pkcs8");
                    break;
                case "spki":
                    if (type && type.toLowerCase() !== "public")
                        throw new CryptoKeyError(CryptoKeyError.WRONG_FORMAT, type, "spki");
                    break;
                case "jwk":
                    break;
                default:
                    throw new CryptoKeyError(CryptoKeyError.UNKNOWN_FORMAT, format);
            }
        }

        static checkFormatImport(format: string, isBuffer: boolean, type: string) {
            this.checkFormat(format);
            if (isBuffer) {

            }

        }

        static generateKey(algorithm: Algorithm, extractable: boolean, keyUsages: string[]): PromiseLike<CryptoKey | CryptoKeyPair> {
            return new Promise((resolve, reject) => {
                throw new WebCryptoError(WebCryptoError.NOT_SUPPORTED);
            });
        }
        static digest(algorithm: Algorithm, data: Uint8Array): PromiseLike<ArrayBuffer> {
            return new Promise((resolve, reject) => {
                throw new WebCryptoError(WebCryptoError.NOT_SUPPORTED);
            });
        }
        static sign(algorithm: Algorithm, key: CryptoKey, data: Uint8Array): PromiseLike<ArrayBuffer> {
            return new Promise((resolve, reject) => {
                throw new WebCryptoError(WebCryptoError.NOT_SUPPORTED);
            });
        }
        static verify(algorithm: Algorithm, key: CryptoKey, signature: Uint8Array, data: Uint8Array): PromiseLike<boolean> {
            return new Promise((resolve, reject) => {
                throw new WebCryptoError(WebCryptoError.NOT_SUPPORTED);
            });
        }
        static encrypt(algorithm: Algorithm, key: CryptoKey, data: Uint8Array): PromiseLike<ArrayBuffer> {
            return new Promise((resolve, reject) => {
                throw new WebCryptoError(WebCryptoError.NOT_SUPPORTED);
            });
        }
        static decrypt(algorithm: Algorithm, key: CryptoKey, data: Uint8Array): PromiseLike<ArrayBuffer> {
            return new Promise((resolve, reject) => {
                throw new WebCryptoError(WebCryptoError.NOT_SUPPORTED);
            });
        }
        static deriveBits(algorithm: Algorithm, baseKey: CryptoKey, length: number): PromiseLike<ArrayBuffer> {
            return new Promise((resolve, reject) => {
                throw new WebCryptoError(WebCryptoError.NOT_SUPPORTED);
            });
        }
        static deriveKey(algorithm: Algorithm, baseKey: CryptoKey, derivedKeyType: Algorithm, extractable: boolean, keyUsages: string[]): PromiseLike<CryptoKey> {
            return new Promise((resolve, reject) => {
                throw new WebCryptoError(WebCryptoError.NOT_SUPPORTED);
            });
        }
        static exportKey(format: string, key: CryptoKey): PromiseLike<JWK | ArrayBuffer> {
            return new Promise((resolve, reject) => {
                throw new WebCryptoError(WebCryptoError.NOT_SUPPORTED);
            });
        }
        static importKey(format: string, keyData: JWK | Uint8Array, algorithm: Algorithm, extractable: boolean, keyUsages: string[]): PromiseLike<CryptoKey> {
            return new Promise((resolve, reject) => {
                throw new WebCryptoError(WebCryptoError.NOT_SUPPORTED);
            });
        }
        static wrapKey(format: string, key: CryptoKey, wrappingKey: CryptoKey, wrapAlgorithm: Algorithm): PromiseLike<ArrayBuffer> {
            return new Promise((resolve, reject) => {
                throw new WebCryptoError(WebCryptoError.NOT_SUPPORTED);
            });
        }
        static unwrapKey(format: string, wrappedKey: Uint8Array, unwrappingKey: CryptoKey, unwrapAlgorithm: Algorithm, unwrappedKeyAlgorithm: Algorithm, extractable: boolean, keyUsages: string[]): PromiseLike<CryptoKey> {
            return new Promise((resolve, reject) => {
                throw new WebCryptoError(WebCryptoError.NOT_SUPPORTED);
            });
        }
    }

}

declare var module: any;
if (typeof module !== "undefined")
    module.exports = webcrypto;