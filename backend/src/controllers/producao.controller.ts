import { Request, Response } from 'express';
import { ProducaoService } from '../services/producao.service';

const producaoService = new ProducaoService();

export const listarProducoes = async (req: Request, res: Response) => {
  try {
    const producoes = await producaoService.listar();
    return res.status(200).json(producoes);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao listar producoes' });
  }
};

export const buscarProducaoPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const producao = await producaoService.buscarPorId(Number(id));
    
    if (!producao) {
      return res.status(404).json({ erro: 'Producao nao encontrada' });
    }
    
    return res.status(200).json(producao);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao buscar producao' });
  }
};

export const buscarProducaoPorAeronave = async (req: Request, res: Response) => {
  try {
    const { aeronaveId } = req.params;
    const producao = await producaoService.buscarPorAeronave(Number(aeronaveId));
    
    if (!producao) {
      return res.status(404).json({ erro: 'Producao nao encontrada para esta aeronave' });
    }
    
    return res.status(200).json(producao);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao buscar producao por aeronave' });
  }
};

export const criarProducao = async (req: Request, res: Response) => {
  try {
    const { aeronaveId, dataPrevisao } = req.body;
    
    if (!aeronaveId) {
      return res.status(400).json({ erro: 'aeronaveId e obrigatorio' });
    }
    
    const producao = await producaoService.criar({
      aeronaveId,
      dataPrevisao: dataPrevisao ? new Date(dataPrevisao) : undefined
    });
    
    return res.status(201).json(producao);
  } catch (error: any) {
    if (error.message?.includes('ja existe')) {
      return res.status(409).json({ erro: error.message });
    }
    return res.status(500).json({ erro: 'Erro ao criar producao' });
  }
};

export const atualizarProducao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { statusAtual, percentual, dataPrevisao, dataFinalizacao } = req.body;
    
    const dados: any = {};
    
    if (statusAtual !== undefined) dados.statusAtual = statusAtual;
    if (percentual !== undefined) dados.percentual = percentual;
    if (dataPrevisao !== undefined) dados.dataPrevisao = new Date(dataPrevisao);
    if (dataFinalizacao !== undefined) dados.dataFinalizacao = new Date(dataFinalizacao);
    
    const producao = await producaoService.atualizar(Number(id), dados);
    
    return res.status(200).json(producao);
  } catch (error: any) {
    if (error.message?.includes('nao encontrada')) {
      return res.status(404).json({ erro: error.message });
    }
    return res.status(500).json({ erro: 'Erro ao atualizar producao' });
  }
};

export const atualizarPercentualProducao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { percentual } = req.body;
    
    if (percentual === undefined || percentual < 0 || percentual > 100) {
      return res.status(400).json({ erro: 'Percentual deve estar entre 0 e 100' });
    }
    
    const producao = await producaoService.atualizarPercentual(Number(id), percentual);
    
    return res.status(200).json(producao);
  } catch (error: any) {
    if (error.message?.includes('nao encontrada')) {
      return res.status(404).json({ erro: error.message });
    }
    return res.status(500).json({ erro: 'Erro ao atualizar percentual' });
  }
};

export const finalizarProducao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const producao = await producaoService.finalizar(Number(id));
    
    return res.status(200).json(producao);
  } catch (error: any) {
    if (error.message?.includes('nao encontrada')) {
      return res.status(404).json({ erro: error.message });
    }
    if (error.message?.includes('ja finalizada')) {
      return res.status(400).json({ erro: error.message });
    }
    return res.status(500).json({ erro: 'Erro ao finalizar producao' });
  }
};

export const cancelarProducao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const producao = await producaoService.cancelar(Number(id));
    
    return res.status(200).json(producao);
  } catch (error: any) {
    if (error.message?.includes('nao encontrada')) {
      return res.status(404).json({ erro: error.message });
    }
    if (error.message?.includes('ja finalizada')) {
      return res.status(400).json({ erro: error.message });
    }
    return res.status(500).json({ erro: 'Erro ao cancelar producao' });
  }
};

export const deletarProducao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await producaoService.deletar(Number(id));
    
    return res.status(200).json({ mensagem: 'Producao deletada com sucesso' });
  } catch (error: any) {
    if (error.message?.includes('nao encontrada')) {
      return res.status(404).json({ erro: error.message });
    }
    return res.status(500).json({ erro: 'Erro ao deletar producao' });
  }
};

export const obterEstatisticasProducao = async (req: Request, res: Response) => {
  try {
    const estatisticas = await producaoService.obterEstatisticas();
    return res.status(200).json(estatisticas);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao obter estatisticas de producao' });
  }
};
