import { Button } from '@/components/ui/button'

export const ButtonShowcase = () => {
  return (
    <div className="space-y-8 p-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Button Variants</h2>
        <div className="space-y-4">
          <div className="flex gap-3 flex-wrap">
            <Button variant="default">Primary Button</Button>
            <Button variant="default" disabled>
              Primary Disabled
            </Button>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="secondary" disabled>
              Secondary Disabled
            </Button>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button variant="outline">Outline Button</Button>
            <Button variant="outline" disabled>
              Outline Disabled
            </Button>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="ghost" disabled>
              Ghost Disabled
            </Button>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button variant="link">Link Button</Button>
            <Button variant="link" disabled>
              Link Disabled
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Button Sizes</h2>
        <div className="flex gap-3 flex-wrap items-center">
          <Button size="sm" variant="default">
            Small
          </Button>
          <Button size="default" variant="default">
            Default
          </Button>
          <Button size="lg" variant="default">
            Large
          </Button>
          <Button size="icon" variant="default">
            🎨
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Button Groups</h2>
        <div className="flex gap-2 flex-wrap">
          <Button variant="default">Save</Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      </section>
    </div>
  )
}
