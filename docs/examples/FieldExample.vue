<script setup lang="ts">
import { ref } from 'vue';
import {
  Button,
  Checkbox,
  Field,
  Form,
  NumberInput,
  Select,
  TextInput,
  max,
  min,
  pattern,
  required,
} from '@asterism-dev/lumen';

const name = ref('');
const port = ref<number | null>(null);
const agent = ref('');
const terms = ref(false);
const saved = ref('');

const taken = ['main', 'develop'];
const nameError = ref('');

function save() {
  nameError.value = taken.includes(name.value) ? 'A branch with this name exists' : '';
  if (!nameError.value) saved.value = `Saved ${name.value} on port ${port.value}`;
}
</script>

<template>
  <Form class="form" @submit="save">
    <Field
      label="Branch name"
      hint="Lowercase letters, digits and dashes"
      :error="nameError"
      :rules="[required(), pattern(/^[a-z0-9-]+$/, 'Only lowercase letters, digits and dashes')]"
    >
      <TextInput v-model="name" @update:model-value="nameError = ''" />
    </Field>
    <Field label="Port" :rules="[required(), min(1), max(65535)]">
      <NumberInput v-model="port" />
    </Field>
    <Field label="Agent" :rules="[required('Choose an agent')]">
      <Select
        v-model="agent"
        :options="[
          { value: '', label: 'Choose…', disabled: true },
          { value: 'claude', label: 'Claude' },
          { value: 'codex', label: 'Codex' },
        ]"
      />
    </Field>
    <Field :rules="[required('Please confirm')]">
      <Checkbox v-model="terms">Delete the old worktree</Checkbox>
    </Field>
    <div>
      <Button type="submit" variant="accent">Create</Button>
    </div>
    <span v-if="saved">{{ saved }}</span>
  </Form>
</template>

<style scoped>
.form {
  max-width: 360px;
}
</style>
