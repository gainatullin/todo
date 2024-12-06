import {request} from "../helpers/request";

const create = async (data: { title: string }) =>
  await request({data: data, url: "/todo"})

const getAll = async () =>
  await request({method: "get", url: "/todo"})

const remove = async (data: number) =>
  await request({method: "delete", url: `/todo/${data}`})

const updateIsCompleted = async (data: { id: number, isCompleted: boolean }) =>
  await request({method:"patch", data, url: `/todo/${data.id}`})

export const TodosService = {
  create,
  getAll,
  remove,
  updateIsCompleted
}
