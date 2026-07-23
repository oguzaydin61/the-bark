# The Bark-Case

Bu proje, Müşteri Talebinden Finans Kaydına Mini İş Akışı simülasyonu olarak The-Bark için bir case study çalışmasıdır.

## 🚀 Teknolojiler ve Kütüphaneler

Proje, güncel ve modern web teknolojileri üzerine inşa edilmiştir:

- **Çekirdek:** React 19, TypeScript
- **Derleyici / Geliştirme Sunucusu:** Vite
- **Stillendirme:** Tailwind CSS v4
- **Durum Yönetimi:** Redux Toolkit & Redux Persist
- **İkonlar:** Lucide React

## 📂 Proje Yapısı

Proje dosyaları `src` dizini altında modüler bir şekilde organize edilmiştir:

- **`assets/`**: Görsel, ikon ve diğer statik dosyalar.
- **`components/`**: Yeniden kullanılabilir UI bileşenleri (örn: `Sidebar.tsx`).
- **`store/`**: Redux store, slice'lar ve durum yönetimi ayarları.
- **`types/`**: TypeScript interfaceve tip tanımlamaları.
- **`views/`**: Ana sayfalar ve modüller:
  - `Dashboard.tsx`: Genel özet ve istatistiklerin bulunduğu ana sayfa.
  - `Projects.tsx`: Proje yönetimi sayfası.
  - `CustomerRequests.tsx`: Müşteri taleplerinin görüntülendiği ekran.
  - `Finance.tsx`: Finansal veriler ve raporlar.
  - `Purchase.tsx`: Satın alma süreçleri ve yönetimi.
  - `LogHistory.tsx`: Sistemdeki işlem geçmişi kayıtları (Loglar).

## 🛠️ Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

1. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

2. **Geliştirme Sunucusunu Başlatın:**
   ```bash
   npm run dev
   ```

3. **Projeyi Derleyin (Build):**
   ```bash
   npm run build
   ```

4. **Derlenmiş Versiyonu Önizleyin:**
   ```bash
   npm run preview
   ```

