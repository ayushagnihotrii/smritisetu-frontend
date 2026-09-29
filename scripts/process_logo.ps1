Add-Type -AssemblyName System.Drawing

$srcPath = "d:\Smritisetu frontend\public\smriti-setu-logo.jpg"
$bmp = New-Object System.Drawing.Bitmap($srcPath)

# 1. Save direct high quality PNG
$bmp.Save("d:\Smritisetu frontend\public\smriti-setu-logo.png", [System.Drawing.Imaging.ImageFormat]::Png)

# 2. Crop the Emblem (Pillar + Book)
# In 1024x1024, pillar + book is roughly x: 232..792, y: 100..720 (560 wide x 620 tall)
$emblemCrop = New-Object System.Drawing.Bitmap(560, 620)
$g = [System.Drawing.Graphics]::FromImage($emblemCrop)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$srcRect = New-Object System.Drawing.Rectangle(232, 100, 560, 620)
$destRect = New-Object System.Drawing.Rectangle(0, 0, 560, 620)
$g.DrawImage($bmp, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
$emblemCrop.Save("d:\Smritisetu frontend\public\smriti-setu-emblem.png", [System.Drawing.Imaging.ImageFormat]::Png)

# 3. Create transparent version of emblem (making white transparent)
$transEmblem = New-Object System.Drawing.Bitmap($emblemCrop.Width, $emblemCrop.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
for ($y = 0; $y -lt $emblemCrop.Height; $y++) {
    for ($x = 0; $x -lt $emblemCrop.Width; $x++) {
        $c = $emblemCrop.GetPixel($x, $y)
        # If very close to white
        if ($c.R -gt 245 -and $c.G -gt 245 -and $c.B -gt 245) {
            $transEmblem.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } elseif ($c.R -gt 220 -and $c.G -gt 220 -and $c.B -gt 220) {
            # anti-alias blend
            $avg = ($c.R + $c.G + $c.B) / 3.0
            $alpha = [int](255 * (1.0 - (($avg - 220) / 25.0)))
            if ($alpha -lt 0) { $alpha = 0 }
            if ($alpha -gt 255) { $alpha = 255 }
            $transEmblem.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B))
        } else {
            $transEmblem.SetPixel($x, $y, $c)
        }
    }
}
$transEmblem.Save("d:\Smritisetu frontend\public\smriti-setu-emblem-transparent.png", [System.Drawing.Imaging.ImageFormat]::Png)

# 4. Also generate a Gold version on transparent background for dark theme
$goldEmblem = New-Object System.Drawing.Bitmap($transEmblem.Width, $transEmblem.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
for ($y = 0; $y -lt $transEmblem.Height; $y++) {
    for ($x = 0; $x -lt $transEmblem.Width; $x++) {
        $c = $transEmblem.GetPixel($x, $y)
        if ($c.A -gt 0) {
            # Gold: #DCB35C = R 220, G 179, B 92
            $goldEmblem.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($c.A, 220, 179, 92))
        }
    }
}
$goldEmblem.Save("d:\Smritisetu frontend\public\smriti-setu-emblem-gold.png", [System.Drawing.Imaging.ImageFormat]::Png)

# 5. Full transparent logo (including text)
$transFullLogo = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -gt 245 -and $c.G -gt 245 -and $c.B -gt 245) {
            $transFullLogo.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } elseif ($c.R -gt 220 -and $c.G -gt 220 -and $c.B -gt 220) {
            $avg = ($c.R + $c.G + $c.B) / 3.0
            $alpha = [int](255 * (1.0 - (($avg - 220) / 25.0)))
            if ($alpha -lt 0) { $alpha = 0 }
            if ($alpha -gt 255) { $alpha = 255 }
            $transFullLogo.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B))
        } else {
            $transFullLogo.SetPixel($x, $y, $c)
        }
    }
}
$transFullLogo.Save("d:\Smritisetu frontend\public\smriti-setu-logo-transparent.png", [System.Drawing.Imaging.ImageFormat]::Png)

$bmp.Dispose()
$emblemCrop.Dispose()
$transEmblem.Dispose()
$goldEmblem.Dispose()
$transFullLogo.Dispose()
Write-Output "Successfully processed official logo and all variants!"

