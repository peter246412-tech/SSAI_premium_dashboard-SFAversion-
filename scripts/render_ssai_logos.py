from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


OUT = Path("public/brand")
SCALE = 3
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"


def rgba(hex_color: str, alpha: int = 255):
    hex_color = hex_color.lstrip("#")
    return tuple(int(hex_color[i : i + 2], 16) for i in (0, 2, 4)) + (alpha,)


def canvas(width: int, height: int):
    return Image.new("RGBA", (width * SCALE, height * SCALE), (0, 0, 0, 0))


def xy(values):
    return tuple(round(v * SCALE) for v in values)


def draw_gradient_text(img, text, xy_pos, font_size, spacing, colors):
    x, y = xy_pos
    font = ImageFont.truetype(FONT_BOLD, font_size * SCALE)
    mask = Image.new("L", img.size, 0)
    mask_draw = ImageDraw.Draw(mask)
    cursor = x * SCALE
    baseline = y * SCALE
    for ch in text:
        mask_draw.text((cursor, baseline), ch, font=font, fill=255)
        bbox = mask_draw.textbbox((cursor, baseline), ch, font=font)
        cursor = bbox[2] + spacing * SCALE

    gradient = Image.new("RGBA", img.size, (0, 0, 0, 0))
    grad_px = gradient.load()
    width = img.size[0]
    stops = [(0.0, rgba(colors[0])), (0.55, rgba(colors[1])), (1.0, rgba(colors[2]))]
    for px in range(width):
        t = px / max(1, width - 1)
        left, right = stops[0], stops[-1]
        for idx in range(len(stops) - 1):
            if stops[idx][0] <= t <= stops[idx + 1][0]:
                left, right = stops[idx], stops[idx + 1]
                break
        local = (t - left[0]) / max(0.001, right[0] - left[0])
        color = tuple(round(left[1][i] + (right[1][i] - left[1][i]) * local) for i in range(4))
        for py in range(img.size[1]):
            grad_px[px, py] = color
    img.alpha_composite(Image.composite(gradient, Image.new("RGBA", img.size, (0, 0, 0, 0)), mask))


def draw_text(draw, pos, text, size, fill, spacing=0):
    font = ImageFont.truetype(FONT_REGULAR, size * SCALE)
    x, y = xy(pos)
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        bbox = draw.textbbox((x, y), ch, font=font)
        x = bbox[2] + spacing * SCALE


def line(draw, points, fill, width):
    draw.line([xy(p) for p in points], fill=fill, width=round(width * SCALE), joint="curve")


def circle(draw, center, radius, fill, outline=None, width=1):
    cx, cy = xy(center)
    r = round(radius * SCALE)
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=fill, outline=outline, width=round(width * SCALE))


def draw_guardian(draw, origin, size, dark=True, alpha=58):
    ox, oy = origin
    k = size / 120
    line_color = "#D8E8F7" if dark else "#0F1A2B"
    blue = "#68BDF5" if dark else "#0068B7"
    gold = "#F2D488" if dark else "#B78A24"
    coral = "#FF6B4A" if dark else "#E35A3D"

    def p(x, y):
        return (ox + x * k, oy + y * k)

    mesh = [
        (55, 12),
        (38, 32),
        (47, 71),
        (26, 94),
        (55, 111),
        (88, 111),
        (117, 94),
        (96, 71),
        (105, 32),
        (88, 12),
        (72, 37),
        (55, 12),
    ]
    line(draw, [p(x, y) for x, y in mesh], rgba(line_color, alpha), 1.15 * k)
    for segment in [
        [(38, 32), (72, 37), (105, 32)],
        [(47, 71), (72, 37), (96, 71)],
        [(47, 71), (72, 78), (96, 71)],
        [(26, 94), (72, 78), (117, 94)],
        [(55, 111), (72, 78), (88, 111)],
        [(38, 32), (47, 71), (26, 94)],
        [(105, 32), (96, 71), (117, 94)],
        [(55, 12), (72, 37), (88, 12)],
    ]:
        line(draw, [p(x, y) for x, y in segment], rgba(line_color, alpha), 1.15 * k)
    for x, y, color, r in [
        (55, 12, line_color, 1.8),
        (38, 32, line_color, 1.8),
        (72, 37, blue, 2),
        (105, 32, line_color, 1.8),
        (72, 78, gold, 2),
        (117, 94, coral, 2),
    ]:
        circle(draw, p(x, y), r * k, rgba(color, min(255, alpha + 56)))


def draw_symbol(draw, origin, size, dark=True):
    ox, oy = origin
    k = size / 120
    base = "#0F1A2B" if dark else "#FFFFFF"
    blue = "#68BDF5" if dark else "#0068B7"
    gold = "#F2D488" if dark else "#B78A24"
    white = "#EAF6FF" if dark else "#111827"
    coral = "#FF6B4A" if dark else "#E35A3D"

    def p(x, y):
        return (ox + x * k, oy + y * k)

    circle(draw, p(60, 60), 58 * k, None, rgba(white, 34 if dark else 24), 1.5 * k)
    draw_guardian(draw, origin, size, dark, 58 if dark else 46)
    line(draw, [p(16, 70), p(40, 36), p(61, 56), p(86, 27), p(109, 62), p(81, 89), p(51, 78), p(31, 101)], rgba(blue), 5.5 * k)
    line(draw, [p(61, 56), p(86, 27), p(109, 62), p(81, 89)], rgba(gold), 5.5 * k)
    for x, y, stroke, r in [
        (16, 70, white, 6.5),
        (40, 36, blue, 6.5),
        (61, 56, white, 7.5),
        (86, 27, blue, 6.5),
        (81, 89, gold, 6.5),
    ]:
        circle(draw, p(x, y), r * k, rgba(base), rgba(stroke), 3 * k)
    circle(draw, p(109, 62), 8 * k, rgba(coral))
    circle(draw, p(109, 62), 14 * k, None, rgba(coral, 62), 2.2 * k)


def draw_flow(draw, x, y, w, dark=True):
    blue = "#68BDF5" if dark else "#0068B7"
    gold = "#F2D488" if dark else "#B78A24"
    coral = "#FF6B4A" if dark else "#E35A3D"
    base = "#0F1A2B" if dark else "#FFFFFF"
    points = [
        (x, y),
        (x + w * 0.20, y),
        (x + w * 0.25, y - 16),
        (x + w * 0.42, y - 16),
        (x + w * 0.47, y),
        (x + w * 0.67, y),
        (x + w * 0.71, y - 12),
        (x + w * 0.86, y - 12),
        (x + w * 0.91, y),
        (x + w, y),
    ]
    line(draw, points[:5], rgba(blue), 2.4)
    line(draw, points[4:8], rgba(gold), 2.4)
    line(draw, points[7:], rgba(coral), 2.4)
    for cx, cy, stroke in [
        (x + w * 0.20, y, blue),
        (x + w * 0.42, y - 16, gold),
        (x + w * 0.67, y, blue),
    ]:
        circle(draw, (cx, cy), 4.5, rgba(base), rgba(stroke), 2)
    circle(draw, (x + w, y), 5.4, rgba(coral))


def render_full(path, dark=True):
    img = canvas(1520, 360)
    draw = ImageDraw.Draw(img)
    draw_symbol(draw, (56, 58), 240, dark)
    if dark:
        draw_gradient_text(img, "SSAI", (350, 68), 142, 17, ("#FFFFFF", "#F6E7BD", "#D8E8F7"))
        text_fill = rgba("#8FA1B8")
    else:
        draw_gradient_text(img, "SSAI", (350, 68), 142, 17, ("#111827", "#263244", "#0068B7"))
        text_fill = rgba("#526174")
    draw_text(draw, (360, 246), "SUPPLY CHAIN RISK INTELLIGENCE", 30, text_fill, 6)
    draw_flow(draw, 360, 306, 830, dark)
    img.resize((1520, 360), Image.Resampling.LANCZOS).save(path)


def render_symbol(path):
    img = canvas(512, 512)
    draw = ImageDraw.Draw(img)
    draw_symbol(draw, (56, 56), 400, True)
    img.resize((512, 512), Image.Resampling.LANCZOS).save(path)


def render_wordmark(path):
    img = canvas(1040, 256)
    draw = ImageDraw.Draw(img)
    draw_guardian(draw, (676, 14), 120, True, 50)
    draw_gradient_text(img, "SSAI", (8, 26), 142, 17, ("#FFFFFF", "#F6E7BD", "#D8E8F7"))
    draw_flow(draw, 16, 188, 825, True)
    draw_text(draw, (18, 222), "EARLY WARNING SUPPLY SIGNALS", 25, rgba("#8FA1B8"), 5)
    img.resize((1040, 256), Image.Resampling.LANCZOS).save(path)


render_full(OUT / "ssai-logo-dark.png", True)
render_full(OUT / "ssai-logo-light.png", False)
render_symbol(OUT / "ssai-symbol-dark.png")
render_wordmark(OUT / "ssai-wordmark-dark.png")
