<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Service\Facades\Api;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index()
    {
        return Api::response(TaskResource::collection(Task::get()));
    }

    public function store(Request $request)
    {
        if (!Api::validate(['title' => 'required|string', 'detail' => 'nullable|string'])) {
            return Api::validation_errors();
        }

        return Api::response(new TaskResource(Auth::user()->tasks()->create($request->only(['title', 'detail']))));
    }

    public function update(Request $request, $id)
    {
        if (!Api::validate(['title' => 'nullable|string', 'detail' => 'nullable|string'])) {
            return Api::validation_errors();
        }

        $task = Task::find($id);
        if (!$task) {
            return Api::not_found();
        }

        if ($request->has('title')) $task->title = $request->title;
        if ($request->has('detail')) $task->detail = $request->detail;
        if ($request->has('is_completed')) $task->is_completed = $request->is_completed;
        $task->save();

        return Api::response(new TaskResource($task));
    }

    public function destroy($id)
    {
        $task = Task::find($id);
        if (!$task) {
            return Api::not_found();
        }
        return Api::response(['deleted' => $task->delete()]);
    }

}
