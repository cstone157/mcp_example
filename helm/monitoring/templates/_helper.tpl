{{/* Generate basic labels for my charts */}}
{{- define "mychart.labels" }}
  labels:
    generator: helm
    date: {{ now | htmlDate }}
    app: {{ default "unknown" .Values.name }}
    version: {{ default "unknown" .Values.version | quote }}
    {{- if .labels }}
    {{- range $key, $value := .labels }}
    {{ $key }}: {{ $value | toYaml | trimSuffix "\n" | indent 2 }}
    {{- end }}
    {{- end }} # End of the mychart.labels template
{{- end }}


{{/* The metadata for all of my charts */}}
{{- define "mychart.metadata" }}
metadata:
  name: {{ .Values.name }}
  namespace: {{ default "default" .Values.global.namespace }}
  {{- include "mychart.labels" $ }}
{{- end }} # End of the mychart.metadata template
