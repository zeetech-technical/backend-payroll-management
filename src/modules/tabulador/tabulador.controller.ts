import { NextFunction, Request, Response } from "express";
import { createTabuladorConfigSchema } from "./tabulador.schema";
import { TabuladorService } from "./tabulador.service";
import { calcularSueldoTotal } from "../../utils/calc";

const tabuladorService = new TabuladorService();

export const getAllTabulador = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tabuladores = await tabuladorService.getAllTabulador();
    return res.status(200).json(tabuladores);
  } catch (error) {
    next(error);
  }
};
export const getTabuladorAllStats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tabuladores = await tabuladorService.getAllTabuladorStats();
    let cpTabuladores = tabuladores.map((tabulador) => {
      const calcs = calcularSueldoTotal(tabulador);
      let cp = JSON.parse(JSON.stringify(tabulador));
      return {
        ...cp,
        calcs,
      };
    });
    return res.status(200).json(cpTabuladores);
  } catch (error) {
    next(error);
  }
};

export const getTabuladorById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const tabulador = await tabuladorService.getTabuladorById(+id);
    return res.status(200).json(tabulador);
  } catch (error) {
    next(error);
  }
};

export const getAllTabuladorConfig = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tabuladorConfig = await tabuladorService.getAllTabuladorConfig();
    return res.status(200).json(tabuladorConfig);
  } catch (error) {
    next(error);
  }
};

export const createTabulador = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tabulador = await tabuladorService.createTabulador();
    return res
      .status(201)
      .json({ message: "tabulador created successfully", data: tabulador });
  } catch (error) {
    next(error);
  }
};

export const createTabuladorConfig = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { success, error, data } = createTabuladorConfigSchema.safeParse(
    req.body,
  );
  if (!success) return next(error);
  try {
    const result = await tabuladorService.createTabulador();
    const conceptos = data.concepts.map((concept) => {
      return {
        ...concept,
        tabuladorId: result.id,
      };
    });

    await tabuladorService.createTabuladorConfig(conceptos);
    const tabuladorCompleto = await tabuladorService.getTabuladorById(
      result.id,
    );
    return res.status(201).json(tabuladorCompleto);
  } catch (error) {
    next(error);
  }
};

export const deleteTabulador = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const { success, error, data } = deleteTabuladorConfigSchema.safeParse(
    //   req.params,
    // );
    // if (!success) return next(error);
    // const tabuladorConfig = await tabuladorService.deleteTabuladorConfig(data);
    // return res
    //   .status(201)
    //   .json({
    //     message: "tabulador config deleted successfully",
    //     data: tabuladorConfig,
    //   });
  } catch (error) {
    next(error);
  }
};

export const deleteTabuladorConfig = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const { success, error, data } = deleteTabuladorConfigSchema.safeParse(
    //   req.params,
    // );
    // if (!success) return next(error);
    // const tabuladorConfig = await tabuladorService.deleteTabuladorConfig(data);
    // return res
    //   .status(201)
    //   .json({
    //     message: "tabulador config deleted successfully",
    //     data: tabuladorConfig,
    //   });
  } catch (error) {
    next(error);
  }
};

export const updateTabulador = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const getTabuladorUserStats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    if (!userId) return next({ type: "custom_error", code: "NOT_FOUND" });

    const tabuladorConfig =
      await tabuladorService.getTabuladorUserStats(userId);
    if (!tabuladorConfig)
      return next({ type: "custom_error", code: "NOT_FOUND" });

    let cpTabuladores = tabuladorConfig.map((tabulador) => {
      const calcs = calcularSueldoTotal(tabulador);
      let cp = JSON.parse(JSON.stringify(tabulador));
      return {
        ...cp,
        calcs,
      };
    });
    return res.status(200).json(cpTabuladores);
  } catch (error) {
    next(error);
  }
};
