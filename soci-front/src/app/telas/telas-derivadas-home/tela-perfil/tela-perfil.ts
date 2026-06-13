import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsuarioServiceService } from '../../service/back/usuario-service/usuario-service.service';
import { AuthServiceService } from '../../service/auth/auth-service.service';
import { UsuarioIdResponse, TipoUsuario } from '../../models/UsuarioCadastro.model';
import { Conectados } from '../../models/Conexoes.model';
import { BackServiceService } from '../../service/back/back-service.service';
import { PublicacaoResponse } from '../../models/Publicacao.model';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-tela-perfil',
  imports: [],
  templateUrl: './tela-perfil.html',
  styleUrl: './tela-perfil.css',
})
export class TelaPerfil implements OnInit {
  usuario: UsuarioIdResponse | null = null;
  conexoes: Conectados[] = [];
  seguidoresCount = 0;
  seguindoCount = 0;
  conexoesCount = 0;
  publicacoesCount = 0;
  loading = true;
  errorMessage: string | null = null;
  inferredIdUsed = false;

  constructor(
    private usuarioService: UsuarioServiceService,
    public authService: AuthServiceService,
    private backService: BackServiceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    let rawId = this.authService.pegarUsuarioId();

    if (!rawId) {
      const token = this.authService.pegarToken();
      if (token) {
        const extracted = this.extractIdFromToken(token);
        if (extracted) {
          rawId = extracted;
        }
      }
    }

    let id = rawId ? Number(rawId) : null;

    forkJoin({
      publicacoes: this.backService.listarPublicacoes(),
      conexoes: this.usuarioService.listarConexoes()
    }).subscribe({
      next: ({ publicacoes, conexoes }) => {
        const pubs = publicacoes || [];
        const conx = conexoes || [];
        this.conexoes = conx;

        if (!id) {
          const inferred = this.inferUserIdFromData(pubs, conx);
          if (inferred) {
            id = inferred;
            this.inferredIdUsed = true;
          } else if (pubs.length > 0) {
            const firstId = this.extractId((pubs[0] as any).usuarioId);
            if (firstId != null) {
              id = firstId;
              this.inferredIdUsed = true;
            }
          }
        }

        const idNum = id ? Number(id) : null;

        if (idNum != null) {
          this.publicacoesCount = pubs.filter(p => Number(p.usuarioId) === idNum).length;
        } else {
          this.publicacoesCount = 0;
        }

        if (idNum != null) {
          this.calcularContagens(conx, idNum);
          this.conexoesCount = this.seguidoresCount + this.seguindoCount;
        } else {
          this.seguidoresCount = 0;
          this.seguindoCount = 0;
          this.conexoesCount = 0;
        }

        if (idNum != null && !this.usuario) {
          this.usuarioService.listarPorId(idNum).subscribe({
            next: u => this.usuario = u,
            error: _ => {}
          });
        }

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (_err) => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });

  }

  private inferUserIdFromData(publicacoes: PublicacaoResponse[], conexoes: Conectados[]): number | null {
    const freq: Record<number, number> = {};

    for (const p of (publicacoes || [])) {
      const id = this.extractId((p as any).usuarioId);
      if (id != null) freq[id] = (freq[id] || 0) + 1;
    }

    for (const c of (conexoes || [])) {
      const o = this.extractId((c as any).usuarioOrigemId ?? (c as any).usuarioOrigem ?? (c as any).origem);
      const d = this.extractId((c as any).usuarioDestinoId ?? (c as any).usuarioDestino ?? (c as any).destino);
      if (o != null) freq[o] = (freq[o] || 0) + 1;
      if (d != null) freq[d] = (freq[d] || 0) + 1;
    }

    let best: number | null = null;
    let bestCount = 0;
    for (const k of Object.keys(freq)) {
      const n = Number(k);
      if (freq[n] > bestCount) {
        best = n;
        bestCount = freq[n];
      }
    }

    return best;
  }

  private extractIdFromToken(token: string): number | null {
    try {
      const parts = token.split('.');
      if (parts.length < 2) return null;
      const payload = parts[1];
      let base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4 !== 0) base64 += '=';
      const json = JSON.parse(atob(base64));
      const candidates = ['idUsuario', 'user_id', 'sub', 'usuarioId', 'id', 'userId'];
      for (const key of candidates) {
        if (key in json) {
          const v = json[key];
          const n = Number(v);
          if (!isNaN(n)) return n;
        }
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  private extractId(value: any): number | null {
    if (value == null) return null;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const n = Number(value);
      return isNaN(n) ? null : n;
    }
    if (typeof value === 'object') {
      if ('id' in value && (typeof value.id === 'number' || typeof value.id === 'string')) {
        const n = Number((value as any).id);
        return isNaN(n) ? null : n;
      }
      if ('usuarioId' in value) {
        const n = Number((value as any).usuarioId);
        return isNaN(n) ? null : n;
      }
      if ('usuarioOrigemId' in value) {
        const n = Number((value as any).usuarioOrigemId);
        return isNaN(n) ? null : n;
      }
      if ('usuarioDestinoId' in value) {
        const n = Number((value as any).usuarioDestinoId);
        return isNaN(n) ? null : n;
      }
    }
    return null;
  }

  private calcularContagens(conexoes: Conectados[], meuId: number) {
    const idNum = Number(meuId);
    let seguidores = 0;
    let seguindo = 0;

    for (const c of (conexoes || [])) {
      const destino = this.extractId((c as any).usuarioDestinoId ?? (c as any).usuarioDestino ?? (c as any).destino);
      const origem = this.extractId((c as any).usuarioOrigemId ?? (c as any).usuarioOrigem ?? (c as any).origem);

      if (destino != null && destino === idNum) seguidores++;
      if (origem != null && origem === idNum) seguindo++;
    }

    this.seguidoresCount = seguidores;
    this.seguindoCount = seguindo;
  }

  get formattedDataNascimento(): string {
    if (!this.usuario?.dataNascimento) {
      return '-';
    }
    const d = new Date(this.usuario.dataNascimento);
    if (isNaN(d.getTime())) return '-';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  get tipoUsuarioLabel(): string {
    if (this.usuario?.tipoUsuario == null) return '-';
    return TipoUsuario[this.usuario.tipoUsuario as unknown as number] ?? String(this.usuario.tipoUsuario);
  }
}
