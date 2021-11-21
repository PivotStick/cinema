<script>
  import { datas } from "@stores";
  import { v4 } from "uuid";
  import XLSX from "xlsx";

  let files;

  const reader = new FileReader();
  reader.onloadend = () => {
    const result = XLSX.read(reader.result, {
      type: "binary",
    });

    const name = result.SheetNames[0];
    const sheet = result.Sheets[name];
    const titles = Object.keys(sheet).reduce((a, key) => {
      if (!key.startsWith("A")) return a;
      a.push(sheet[key].v);
      return a;
    }, []);

    $datas.dico.titles = titles
      .slice(1)
      .map((name) => ({ _id: v4(), name: name.toString(), type: "PUB" }));
  };

  $: {
    if (files?.[0]) reader.readAsBinaryString(files[0]);
  }
</script>

<label>
  <p>Charger un Dico</p>
  <input type="file" bind:files />
</label>

<style>
  label {
    display: block;
    border: 1px solid #ddd;
    border-radius: 1em;
    padding: 1em;
    width: 100%;

    text-align: center;
  }
</style>
