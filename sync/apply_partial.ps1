param(
  [string]$NotionExport,
  [string]$CoreData
)
$ErrorActionPreference = 'Stop'
Set-ExecutionPolicy -Scope Process Bypass -Force | Out-Null
if (-not $NotionExport -and $env:NOTION_EXPORT_PATH) { $NotionExport = $env:NOTION_EXPORT_PATH }
if (-not $CoreData -and $env:CORE_DATA_PATH) { $CoreData = $env:CORE_DATA_PATH }
if (-not $NotionExport -or -not $CoreData) {
  try {
    $cfg = Get-Content -Raw -Path (Join-Path $PSScriptRoot 'config.json') | ConvertFrom-Json
    if (-not $NotionExport) { $NotionExport = (Join-Path (Split-Path $PSScriptRoot -Parent) $cfg.paths.export) }
    if (-not $CoreData) { $CoreData = (Join-Path (Split-Path $PSScriptRoot -Parent) $cfg.paths.core) }
  } catch {}
}
node (Join-Path $PSScriptRoot 'index.js') apply-partial $NotionExport $CoreData
exit $LASTEXITCODE
