interface IConceptoCalculado {
  id: number;
  name: string;
  tipo: "monto" | "porcentaje";
  monto?: number;
  porcentaje?: number;
  valor: number;
}

interface IResultadoNomina {
  id: number;
  sueldoBase: number;
  percepciones: IConceptoCalculado[];
  deducciones: IConceptoCalculado[];
  totalPercepciones: number;
  totalDeducciones: number;
  total: number;
}

export function calcularSueldoTotal(
  input: any | any[]
): IResultadoNomina[] {

  const items = Array.isArray(input)
    ? input
    : [input];

  return items.map((item): IResultadoNomina => {
    let sueldoBase = 0;
    const percepciones: IConceptoCalculado[] = [];
    const deducciones: IConceptoCalculado[] = [];

    const sueldoConfig = item.tabuladorConfig.find(
      (c:any) => c.catalog.name === "Sueldo Base"
    );

    sueldoBase = Number(sueldoConfig?.monto ?? 0); 
    for (const config of item.tabuladorConfig) {
      const factor =
        Number(config.catalog.typeCatalog.factor);
      if (config.catalog.name === "Sueldo Base") {
        continue;
      }
      const esPorcentaje =
        config.porcentaje !== null;

      const valor = esPorcentaje
        ? sueldoBase * Number(config.porcentaje)
        : Number(config.monto ?? 0);

      const concepto: IConceptoCalculado = {
        id: config.id,
        name: config.catalog.name,
        tipo: esPorcentaje
          ? "porcentaje"
          : "monto",

        valor
      };

      if (esPorcentaje) {
        concepto.porcentaje =
          Number(config.porcentaje);
      } else {
        concepto.monto =
          Number(config.monto);
      }

      if (factor === 1) {
        percepciones.push(concepto);
      }

      if (factor === -1) {
        deducciones.push(concepto);
      }
    }

    const totalPercepciones =
      percepciones.reduce(
        (acc, item) => acc + item.valor,
        0
      );

    const totalDeducciones =
      deducciones.reduce(
        (acc, item) => acc + item.valor,
        0
      );

    const total =
      (sueldoBase + totalPercepciones)
      - totalDeducciones;

    return {
      id: item.id,
      sueldoBase,
      percepciones,
      deducciones,
      totalPercepciones,
      totalDeducciones,
      total
    };
  });
}