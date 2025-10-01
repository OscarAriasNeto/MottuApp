import { api } from '../client';
import * as motoService from '../motos';
import * as storage from '../../../utils/storage';
import { Moto } from '../../../types/moto';

jest.mock('../client', () => {
  const actual = jest.requireActual('../client');
  return {
    ...actual,
    api: {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    },
  };
});

jest.mock('../../../utils/storage', () => ({
  getObject: jest.fn(),
  saveObject: jest.fn(),
}));

const mockedApi = api as unknown as {
  get: jest.Mock;
  post: jest.Mock;
  put: jest.Mock;
  delete: jest.Mock;
};

const mockedStorage = storage as unknown as {
  getObject: jest.Mock;
  saveObject: jest.Mock;
};

describe('motoService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('falls back to cache when the API fails', async () => {
    const cachedMotos: Moto[] = [
      {
        id: '1',
        plate: 'ABC1D23',
        model: 'Honda CG',
        status: 'available',
        year: 2022,
        mileage: 1200,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    mockedApi.get.mockRejectedValueOnce(new Error('Network error'));
    mockedStorage.getObject.mockResolvedValueOnce(cachedMotos);

    const motos = await motoService.getMotos();

    expect(motos).toEqual(cachedMotos);
    expect(mockedStorage.getObject).toHaveBeenCalled();
  });
});
