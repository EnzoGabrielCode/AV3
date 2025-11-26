const API_URL = 'http://localhost:3000/api'

export const api = {
    async get(endpoint) {
        const response = await fetch(`${API_URL}${endpoint}`)
        return response.json()
    },

    async post(endpoint, data) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        return response.json()
    },

    async put(endpoint, data) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        return response.json()
    },

    async delete(endpoint) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE'
        })
        return response.json()
    }
}

export const aeronaveService = {
    listar: () => api.get('/aeronaves'),
    buscarPorId: (id) => api.get(`/aeronaves/${id}`),
    criar: (data) => api.post('/aeronaves', data),
    atualizar: (id, data) => api.put(`/aeronaves/${id}`, data),
    deletar: (id) => api.delete(`/aeronaves/${id}`)
}

export const usuarioService = {
    login: (data) => api.post('/usuarios/login', data),
    listar: () => api.get('/usuarios'),
    criar: (data) => api.post('/usuarios', data)
}

export const producaoService = {
    listar: () => api.get('/producoes'),
    criar: (data) => api.post('/producoes', data),
    atualizar: (id, data) => api.put(`/producoes/${id}`, data)
}

export const pecaService = {
    listar: () => api.get('/pecas'),
    criar: (data) => api.post('/pecas', data),
    atualizar: (id, data) => api.put(`/pecas/${id}`, data),
    deletar: (id) => api.delete(`/pecas/${id}`)
}

export const etapaService = {
    listar: () => api.get('/etapas'),
    criar: (data) => api.post('/etapas', data),
    atualizar: (id, data) => api.put(`/etapas/${id}`, data)
}

export const funcionarioService = {
    listar: () => api.get('/funcionarios'),
    criar: (data) => api.post('/funcionarios', data),
    atualizar: (id, data) => api.put(`/funcionarios/${id}`, data),
    deletar: (id) => api.delete(`/funcionarios/${id}`)
}

export const testeService = {
    listar: () => api.get('/testes'),
    criar: (data) => api.post('/testes', data),
    atualizar: (id, data) => api.put(`/testes/${id}`, data)
}
