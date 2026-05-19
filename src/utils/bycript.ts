import argon2 from "argon2";

export const hashChain = async (text: string) => {
  return await argon2.hash(text, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16, // MB
    timeCost: 3,
    parallelism: 1,
  });
};

export const compareHashChain = async (
  textCompare: string,
  textHashed: string,
) => {
  return await argon2.verify(textHashed, textCompare);
};
