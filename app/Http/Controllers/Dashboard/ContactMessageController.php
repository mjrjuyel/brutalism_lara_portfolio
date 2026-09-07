<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactMessageController extends Controller
{
    public function index(Request $request)
    {
        $messages = $request->user()->contactMessages()->latest()->paginate(20);
        return Inertia::render('Dashboard/Messages/Index', ['messages' => $messages]);
    }

    public function show(ContactMessage $contactMessage)
    {
        if (!$contactMessage->is_read) {
            $contactMessage->update(['is_read' => true]);
        }
        return Inertia::render('Dashboard/Messages/Show', ['message' => $contactMessage]);
    }

    public function destroy(ContactMessage $contactMessage)
    {
        $contactMessage->delete();
        return redirect()->route('dashboard.messages.index')->with('success', 'Message deleted.');
    }
}
