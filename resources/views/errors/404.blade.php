<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>404 // SECTOR_NOT_FOUND</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --background: #000000;
            --foreground: #ffffff;
            --primary: #00ff41;
            --card: #0a0a0a;
            --border: #333333;
            --destructive: #ff0040;
            --muted: #888888;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            background: var(--background);
            color: var(--foreground);
            font-family: 'Space Grotesk', sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow-x: hidden;
            position: relative;
        }
        /* Scanlines */
        body::before {
            content: " ";
            position: fixed;
            top: 0; left: 0; bottom: 0; right: 0;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
            background-size: 100% 3px, 6px 100%;
            pointer-events: none;
            z-index: 50;
        }
        header, footer {
            padding: 1rem 2rem;
            border-color: var(--border);
            border-style: solid;
            background: rgba(0,0,0,0.85);
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.75rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        header { border-bottom-width: 1px; }
        footer { border-top-width: 1px; color: var(--muted); }
        .logo { font-weight: 900; font-size: 1.1rem; text-decoration: none; color: #fff; letter-spacing: 1px; }
        .logo:hover { color: var(--primary); }
        main {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 3rem 1.5rem;
            flex: 1;
        }
        .card {
            background: var(--card);
            border: 2px solid var(--border);
            max-width: 680px;
            width: 100%;
            padding: 2.5rem;
            position: relative;
        }
        .corner {
            position: absolute;
            width: 20px;
            height: 20px;
            border-color: var(--primary);
            border-style: solid;
        }
        .corner-tl { top: -2px; left: -2px; border-width: 2px 0 0 2px; }
        .corner-tr { top: -2px; right: -2px; border-width: 2px 2px 0 0; }
        .corner-bl { bottom: -2px; left: -2px; border-width: 0 0 2px 2px; }
        .corner-br { bottom: -2px; right: -2px; border-width: 0 2px 2px 0; }
        .tag {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.7rem;
            color: var(--destructive);
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
            display: inline-block;
        }
        .num {
            font-size: 6rem;
            font-weight: 900;
            line-height: 1;
            letter-spacing: -3px;
            margin-bottom: 0.5rem;
        }
        h1 {
            font-size: 1.8rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: -1px;
            margin-bottom: 0.5rem;
        }
        p {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.85rem;
            color: var(--muted);
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }
        .terminal {
            background: #000;
            border: 1px solid var(--border);
            padding: 1rem;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.75rem;
            margin-bottom: 2rem;
            color: #fff;
            line-height: 1.8;
        }
        .terminal span.prompt { color: var(--primary); }
        .actions {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        .btn-primary {
            background: var(--primary);
            color: #000;
            padding: 0.9rem 1.6rem;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.8rem;
            font-weight: 700;
            text-decoration: none;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: opacity 0.2s;
        }
        .btn-primary:hover { opacity: 0.9; }
        .btn-secondary {
            background: #1a1a1a;
            color: #fff;
            padding: 0.9rem 1.6rem;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.8rem;
            font-weight: 700;
            text-decoration: none;
            text-transform: uppercase;
            letter-spacing: 1px;
            border: 1px solid var(--border);
        }
        .btn-secondary:hover { background: #262626; }
    </style>
</head>
<body>
    <header>
        <a href="/" class="logo">// MJR JUYEL</a>
        <span style="color: var(--destructive);">FAULT: 0x404_VOID</span>
    </header>

    <main>
        <div class="card">
            <div class="corner corner-tl"></div>
            <div class="corner corner-tr"></div>
            <div class="corner corner-bl"></div>
            <div class="corner corner-br"></div>

            <span class="tag">// CRITICAL EXCEPTION // SECTOR_NOT_FOUND</span>
            <div class="num">404</div>
            <h1>COORDINATE UNRESOLVED</h1>
            <p>The requested route coordinate does not exist in this sector, has been purged from memory, or access credentials are insufficient.</p>

            <div class="terminal">
                <div><span class="prompt">&gt;</span> ERROR_STATUS: HTTP_404_NOT_FOUND</div>
                <div><span class="prompt">&gt;</span> SIGNAL_ANALYSIS: Target memory address could not be resolved.</div>
                <div><span class="prompt">&gt;</span> RECOVERY_DIRECTIVE: Reroute packet flow back to primary root index node.</div>
            </div>

            <div class="actions">
                <a href="/" class="btn-primary">INITIALIZE RECOVERY [HOME] &rarr;</a>
                <a href="javascript:history.back()" class="btn-secondary">&larr; STEP BACK</a>
            </div>
        </div>
    </main>

    <footer>
        <span>SYS_MONITOR // ANOMALY CONFINED</span>
        <span>NODE_2030 // ALL RIGHTS RESERVED</span>
    </footer>
</body>
</html>
