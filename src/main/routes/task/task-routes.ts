import { Router } from 'express'
import {
  adaptRoute,
  adaptRouteListPager
} from '../../adpters/express-route-adapter'
import { makeAddTaskController } from '../../factories/task/add-task/add-task-factories'
import { makeUpdateTaskController } from '../../factories/task/update-task/update-task-factories'
import { makeCompleteTaskController } from '../../factories/task/complete-task/complete-task-factories'
import { makeFindOneTaskController } from '../../factories/task/find-one-task/find-one-task-factories'
import { makeListTaskController } from '../../factories/task/list-task/list-task-factories'
import { makeDeleteTaskController } from '../../factories/task/delete-task/delete-task-factories'

export default (router: Router): void => {
  // Create Task
  router.post('/task', adaptRoute(makeAddTaskController()))

  // Update Task
  router.put('/task', adaptRoute(makeUpdateTaskController()))

  // list Task
  router.get('/task', adaptRouteListPager(makeListTaskController()))

  // Complete Task
  router.patch('/task/:id', adaptRoute(makeCompleteTaskController()))

  // Complete Task
  router.get('/task/:id', adaptRoute(makeFindOneTaskController()))

  // Complete Task
  router.delete('/task/:id', adaptRoute(makeDeleteTaskController()))
}
