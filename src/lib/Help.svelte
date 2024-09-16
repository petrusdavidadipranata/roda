<script>
  import { fade } from "svelte/transition";
  import { helpPopup } from "$lib/stores.js";
  import Button from "./PopupBtn.svelte";

  const close = () => {
    helpPopup.set(false);
  }
</script>

<button class="absolute inset-0 z-20 bg-black/30 grid place-items-center w-screen cursor-default" on:click={close} transition:fade={{duration:200}}>
  <div class="px-10 w-full">
    <div class="sm:w-[34rem] z-100 rounded-xl overflow-hidden text-left mx-auto">
      <div class="flex justify-between items-center px-6 py-4 text-xl text-white bg-blue-600">
        <h1><i class="fa-regular fa-circle-question mr-1.5"></i> Bantuan - Panduan Pengguna</h1>
        <button class="fa-solid fa-xmark hover:text-gray-200" on:click={close}></button>
      </div>
      <div class="px-6 py-4 bg-white">
        <ul class="mb-2 list-disc list-outside ml-4">
          <li>
            Buka sidebar (<i class="fa-solid fa-bars text-gray-400 px-0.5 text-sm"></i>) dan mulai mengedit nama pada roda.
          </li>
          <li>
            <span class="bg-gray-200 text-gray-600 px-2 py-1 rounded-sm">Acak</span>, <span class="bg-gray-200 text-gray-600 px-2 py-1 rounded-sm">Urutkan</span>, dan <span class="bg-gray-200 text-gray-600 px-2 py-1 rounded-sm">Tambah Entri</span> sudah jelas. Tidak diperlukan penjelasan lebih lanjut.
          </li>
          <li>
            Klik tombol <span class="bg-gray-200 text-gray-600 px-2 py-1 rounded-sm">Lanjutan</span> untuk mengedit probabilitas (default: semua memiliki peluang yang sama untuk dipilih).
          </li>
          <li>
            Klik lagi tombol <span class="bg-gray-200 text-gray-600 px-2 py-1 rounded-sm">Lanjutan</span> untuk menyembunyikan probabilitas (namun, mereka tetap valid <i class="fa-solid fa-arrow-right text-gray-600"></i> ini dapat digunakan untuk kecurangan).
          </li>
          <li>
            Jika Anda ingin melihat hasilnya, klik pada tab <i>Hasil</i>.
          </li>
          <li>
            Fitur <span class="bg-gray-200 text-gray-600 px-2 py-1 rounded-sm">Unggah</span> masih dalam tahap Beta...
          </li>
        </ul>
        <div class="flex justify-end gap-4 -mr-1.5">
          <Button text="Tutup" on:click={close} />
        </div>
      </div>
    </div>    
  </div>
</button>