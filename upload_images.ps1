$files = Get-ChildItem "public/cronograma" -File

foreach ($f in $files) {
    $relativePath = "public/cronograma/" + $f.Name
    $sizeMB = $f.Length / 1MB
    Write-Host "Processing: $relativePath ($($sizeMB.ToString('N2')) MB)"
    
    # Git add
    git add "$relativePath"
    
    # Commit
    git commit -m "Add image $($f.Name)"
    
    # Push - using force to overwrite previous large commits if necessary
    git push --force
    
    if ($?) {
        Write-Host "Successfully uploaded $($f.Name)" -ForegroundColor Green
    }
    else {
        Write-Host "Failed to upload $($f.Name)" -ForegroundColor Red
        exit 1
    }
}
