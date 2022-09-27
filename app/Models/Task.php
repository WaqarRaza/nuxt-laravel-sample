<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected static function booted()
    {
        static::addGlobalScope('user', function (Builder $builder) {
            $builder->when(auth()->check(), function (Builder $query) {
                $query->where('user_id', auth()->id());
            });
        });
    }

    protected $fillable = ['title', 'detail', 'user_id', 'is_completed'];
}
