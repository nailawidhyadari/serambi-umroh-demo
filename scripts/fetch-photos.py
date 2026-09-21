# Unduh foto dari Wikimedia Commons (lisensi bebas) + simpan kredit fotografer.
# Jalankan dari root proyek: python3 scripts/fetch-photos.py (butuh Pillow).
import json, re, time, urllib.parse, urllib.request
from PIL import Image
UA = {"User-Agent": "SerambiDemo/1.0 (demo site; contact ettafamily23@gmail.com)"}
S = " (Umroh Ramadhan 2023)-"
PHOTOS = {
  "haram-kabah": "Masjidil Haram" + S + "37.jpg",
  "haram-jamaah": "Masjidil Haram" + S + "24.jpg",
  "haram-malam": "Masjidil Haram" + S + "9.jpg",
  "abraj-malam": "Masjidil Haram" + S + "17.jpg",
  "haram-luar": "Masjidil Haram" + S + "39.jpg",
  "nabawi-payung": "Masjid Nabawi" + S + "30.jpg",
  "nabawi": "Masjid Nabawi" + S + "1.jpg",
  "nabawi-iftar": "Masjid Nabawi" + S + "8.jpg",
  "raudhah": "Masjid Nabawi" + S + "19.jpg",
  "makan": "Masjid Nabawi" + S + "10.jpg",
  "quba": "Masjid Quba" + S + "1.jpg",
  "jabal-rahmah": "Jabal Rahmah" + S + "2.jpg",
  "uhud": "Gunung Uhud" + S + "6.jpg",
  "kurma": "Kebun Kurma Madinah" + S + "6.jpg",
  "bir-ali": "Masjid Dzulhulaifah" + S + "4.jpg",
  "tanim": "Masjid Tan'im" + S + "5.jpg",
  "mina": "Tenda Mina" + S + "5.jpg",
  "bus": "Tenda Mina" + S + "4.jpg",
  "hotel-madinah": "Hotel Salma Al-Masi" + S + "4.jpg",
  "thaif": "Masjid Abdullah bin Abbas, Thaif" + S + "1.jpg",
  "istanbul": "Sultan Ahmed Mosque 2022 2.jpg",
  "arafah": "Pilgrims must spend the time within a defined area on the plain of Arafat. - Flickr - Al Jazeera English.jpg",
  "jamarat": "Jamarat Bridge 23.JPG",
}
credits = {}
for key, title in PHOTOS.items():
    q = urllib.parse.urlencode({"action": "query", "format": "json", "titles": "File:" + title,
        "prop": "imageinfo", "iiprop": "url|extmetadata|size", "iiurlwidth": "1600"})
    d = json.load(urllib.request.urlopen(urllib.request.Request("https://commons.wikimedia.org/w/api.php?" + q, headers=UA)))
    page = next(iter(d["query"]["pages"].values()))
    ii = page["imageinfo"][0]; m = ii["extmetadata"]
    artist = re.sub(r"<[^>]+>", "", m.get("Artist", {}).get("value", "")).strip()
    lic = m.get("LicenseShortName", {}).get("value", "")
    out = f"public/photos/{key}.jpg"
    for a in range(5):
        try:
            data = urllib.request.urlopen(urllib.request.Request(ii["thumburl"], headers=UA)).read(); break
        except Exception:
            time.sleep(4)
    open(out, "wb").write(data)
    im = Image.open(out).convert("RGB")
    im.save(out, "JPEG", quality=74, optimize=True, progressive=True)
    credits[key] = {"author": artist, "license": lic, "source": ii["descriptionurl"], "width": im.width, "height": im.height}
    print(key, im.size, lic, artist)
    time.sleep(0.5)
json.dump(credits, open("src/data/photo-credits.json", "w"), indent=2, ensure_ascii=False)
