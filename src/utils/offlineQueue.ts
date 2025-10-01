import { getObject, saveObject } from './storage';

type MutationMethod = 'POST' | 'PUT' | 'DELETE';

export interface OfflineMutation<TPayload> {
  id: string;
  method: MutationMethod;
  endpoint: string;
  payload: TPayload;
  timestamp: number;
}

export async function enqueueMutation<TPayload>(
  key: string,
  mutation: OfflineMutation<TPayload>,
): Promise<void> {
  const queue = ((await getObject<OfflineMutation<TPayload>[]>(key)) ?? []).filter(Boolean);
  queue.push(mutation);
  await saveObject(key, queue);
}

export async function consumeQueue<TPayload>(
  key: string,
): Promise<OfflineMutation<TPayload>[]> {
  const queue = (await getObject<OfflineMutation<TPayload>[]>(key)) ?? [];
  await saveObject(key, []);
  return queue;
}
