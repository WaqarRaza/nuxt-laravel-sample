<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'title' => $this->title,
            'detail' => $this->detail,
            'is_completed' => (bool)$this->is_completed,
            'created_at' => $this->created_at,
        ];
    }
}
