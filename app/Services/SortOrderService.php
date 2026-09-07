<?php

namespace App\Services;

class SortOrderService
{
    public function reorder(string $modelClass, array $orderedIds): void
    {
        foreach ($orderedIds as $index => $id) {
            $modelClass::where('id', $id)->update(['sort_order' => $index]);
        }
    }
}
